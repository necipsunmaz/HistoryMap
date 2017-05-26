using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HistoryMap.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http;
using System.Text.RegularExpressions;

namespace HistoryMap.Controllers
{
    public class AdminController : Controller
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IHostingEnvironment _environment;
        private readonly UserManager<ApplicationUser> _securityManager;
        private readonly SignInManager<ApplicationUser> _loginManager;
        private readonly ApplicationDb _db;

        public AdminController(UserManager<ApplicationUser> secMgr, SignInManager<ApplicationUser> loginManager, ApplicationDb db, IHostingEnvironment environment, IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
            _environment = environment;
            _securityManager = secMgr;
            _loginManager = loginManager;
            _db = db;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Index(string returnUrl = null)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Details");
            }
            else
            {
                ViewData["ReturnUrl"] = returnUrl;
                return View();
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(Login model, string returnUrl = null)
        {

            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                var result = await _loginManager.PasswordSignInAsync(model.UserName, model.Password, false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return RedirectToReturnUrl(returnUrl);
                }
                else { ModelState.AddModelError("", "User name or password is wrong!"); }
            }

            return View(model);
        }


        [Authorize]
        public ActionResult Details()
        {
            if (User.Identity.IsAuthenticated)
            {
                ViewBag.Username = _securityManager.GetUserName(User);
                return View();
            }
            else { return RedirectToAction("Index"); }
        }


        public async Task<IActionResult> Logout()
        {
            await _loginManager.SignOutAsync();
            return RedirectToAction("Index");
        }

        private IActionResult RedirectToReturnUrl(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Details");
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult GetDataCountry(int Century)
        {
            using (_db)
            {
                var country = _db.Country.Where(a => a.Century.Centuries.Equals(Century)).Select(x => new { x.Id, x.Title, x.Description }).ToList();
                return Json(new { data = country });
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult Save(int id, int century)
        {
            using (_db)
                {
                    var v = _db.Country.FirstOrDefault(a => a.Id.Equals(id));
                    var centuryId = _db.Century.Where(a => a.Centuries.Equals(century)).Select(x => new { x.Id }).First();
                    ViewBag.centuryid = centuryId.Id;
                    return View(v);
                }
        }

        [Authorize]
        [HttpPost]
        public IActionResult Save(Country country)
        {
            bool status = false;
            if (ModelState.IsValid)
            {
                using (_db)
                {
                    if (country.Id > 0)
                    {
                        //Edit
                        var v = _db.Country.FirstOrDefault(a => a.Id.Equals(country.Id));
                        if (v != null)
                        {
                            v.Title = country.Title;
                            v.Description = country.Description;
                            v.Details = country.Details;
                        }
                    }
                    else
                    {
                        //Save
                        _db.Country.Add(country);
                    }
                    _db.SaveChanges();
                    status = true;
                }
            }

            return Json(status);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Delete(int id)
        {
            using (_db)
            {
                var v = _db.Country.FirstOrDefault(a => a.Id.Equals(id));
                if (v != null)
                {
                    return View(v);
                }
                else
                {
                    return Content("alert('Country not found!');");
                }
            }
        }
        [Authorize]
        [HttpPost]
        [ActionName("Delete")]
        public IActionResult DeleteCountry(int id)
        {
            bool status = false;
            using (_db)
            {
                var v = _db.Country.FirstOrDefault(a => a.Id.Equals(id));
                if (v != null)
                {
                    _db.Country.Remove(v);
                    _db.SaveChanges();
                    status = true;
                }
            }
            return Json(status); //    Json(new { data = new { status = status } });
        }

        [Authorize]
        [HttpGet]
        public IActionResult Century()
        {
            return View();
        }

        [Authorize]
        public JsonResult IsCenturyExists(int Centuries)
        {
            return Json(!_db.Century.Any(x => x.Centuries.Equals(Centuries)));
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddCentury(CenturyViewModel model)
        {
            bool status = false;
            if (ModelState.IsValid)
            {
                var century = new Century();
                century.Centuries = model.Centuries;
                using (var memoryStream = new MemoryStream())
                {
                    model.Data.CopyTo(memoryStream);
                    century.Data = memoryStream.ToArray();
                }
                _db.Century.Add(century);
                _db.SaveChanges();
                status = true;
            }
            return Json(status);
        }

        [Authorize]
        [HttpPost]
        public IActionResult UpdateCentury(CenturyViewModel model)
        {
            bool status = false;
            if (ModelState.IsValid)
            {
                var century = _db.Century.FirstOrDefault(x => x.Centuries.Equals(model.Centuries));
                using (var memoryStream = new MemoryStream())
                {
                    model.Data.CopyTo(memoryStream);
                    century.Data = memoryStream.ToArray();
                }
                _db.SaveChanges();
                status = true;
            }
            return Json(status);
        }

        [Authorize]
        [HttpPost]
        public IActionResult DeleteCentury(CenturyViewModel model)
        {
            bool status = false;
            var x = _db.Century.FirstOrDefault(a => a.Centuries.Equals(model.Centuries));
            if (x != null)
            {
                _db.Century.Remove(x);
                _db.SaveChanges();
                status = true;
            }
            return Json(status);
        }
    }
}