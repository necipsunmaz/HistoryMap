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

        private readonly ApplicationDb db;
        public HomeController(ApplicationDb _db)
        {
            db = _db;
        }


        public IActionResult Error()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GetCountryDetails(string country, int id)
        {
            var Country = db.Countries.FirstOrDefault(w => w.Title.Equals(country) && w.Century.Century.Equals(id));
            return Json(Country);
        }

        public IActionResult GetData(int Centurie)
        {
            try
            {
                var centuryMap = db.Centuries.FirstOrDefault(a => a.Century.Equals(Centurie));
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
