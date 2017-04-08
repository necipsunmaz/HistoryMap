using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using HistoryMap.Models;

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
        public IActionResult GetCountryDetails(string country)
        {
            var Country = db.Countries.FirstOrDefault(a => a.Title.Equals(country));
            return Json(Country);
        }

        public IActionResult GetData()
        {
            var centuryMap = db.Centuries.FirstOrDefault(a => a.Century.Equals(19));
            MemoryStream file = new MemoryStream(centuryMap.Data);
            //binaryData
            return new FileStreamResult(file, "application/javascript");
        }

    }
}
