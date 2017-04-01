using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HistoryMap.Models
{
    [Table("CountryDetails")]
    public class CountryDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string CountryCode { get; set; }
        [Required]
        [StringLength(80)]
        public string Name { get; set; }
        public byte[] Data { get; set; }
    }
}
