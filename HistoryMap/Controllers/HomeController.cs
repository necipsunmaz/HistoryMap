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

        public JsonResult GetCountryDetails(string title)
        {
            return null;        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult GetData()
        {
            var centuryMap = db.Centuries.FirstOrDefault(a => a.Century.Equals(19));
            MemoryStream file = new MemoryStream(centuryMap.Data);
            //Response.ContentType = "application/js";
            //file.WriteTo(Response.OutputSetream)
            //byte[] binaryData = centuryMap.Data.ToArray();
            //centuryMap

            //binaryData
            return new FileStreamResult(file, "application/javascript");
        }

        //public IActionResult Index()
        //{
        //    var centuryMap = db.Centuries.FirstOrDefault(a => a.Century.Equals(19));
        //    MemoryStream file = new MemoryStream(centuryMap.Data);
        //    ViewData["JS"] = file.ReadByte();
        //    return View();
        //}
    }
}
