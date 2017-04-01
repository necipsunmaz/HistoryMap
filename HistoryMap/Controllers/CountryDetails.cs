using HistoryMap.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryMap.Controllers
{
    public class CountryDetails : Controller
    {
        private readonly ApplicationDb db;

        public CountryDetails(ApplicationDb _db)
        {
            db = _db;
        }
        public IActionResult Index()
        {
            return View(db.CountryDetail.ToList());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Models.CountryDetails countrymodel)
        {
            if (ModelState.IsValid)
            {
                db.CountryDetail.Add(countrymodel);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View();

        }

    }
}
