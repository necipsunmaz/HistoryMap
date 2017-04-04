using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryMap.Models
{
    [Table("Countries")]
    public class Countries
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Column(TypeName = "text")]
        public string Details { get; set; }

        public int CenturyId { get; set; }

        [ForeignKey("CenturyId")]
        public Centuries Century { get; set; }
    }
}
