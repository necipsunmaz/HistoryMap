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
    [Table("Centuries")]
    public class Centuries
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int Century { get; set; }

        [Required]
        public byte[] Data { get; set; }

        public ICollection<Countries> Country { get; set; }
    }
}
