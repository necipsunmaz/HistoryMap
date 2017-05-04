using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HistoryMap.Models
{
    [Table("Century")]
    public class Century
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int Centuries { get; set; }

        [Required]
        public byte[] Data { get; set; }

        public ICollection<Country> Country { get; set; }
    }

    public class CenturyViewModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int Centuries { get; set; }

        [Required]
        public IFormFile Data { get; set; }
    }
}
