using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using HistoryMap.Models;
using Microsoft.EntityFrameworkCore;

namespace HistoryMap.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private readonly ApplicationDb _db;
        public HomeController(ApplicationDb db)
        {
            _db = db;
        }


        public IActionResult Error()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GetCountryDetails(string country, int id)
        {
            var Country = _db.Country.FirstOrDefault(w => w.Title.Equals(country) && w.Century.Centuries.Equals(id));
            return Json(Country);
        }

        public IActionResult GetData(int Century)
        {
            try
            {
                var centuryMap = _db.Century.FirstOrDefault(a => a.Centuries.Equals(Century));
                MemoryStream file = new MemoryStream(centuryMap.Data);
                //binaryData
                return new FileStreamResult(file, "application/javascript");
            }
            catch (Exception)
            {
                return Content("alert('Henüz bu yüzyılı eklemedik!');");
            }
        }

    }
}
