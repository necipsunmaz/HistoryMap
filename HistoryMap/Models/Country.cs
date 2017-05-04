using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryMap.Models
{
    [Table("Country")]
    public class Country
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "This field is required!")]
        [StringLength(80, ErrorMessage = "This field is max length 80 characther!")]
        public string Title { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "This field is required!")]
        [Column(TypeName = "text")]
        public string Details { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "This field is required!")]
        [StringLength(80, ErrorMessage = "This field is max length 80 characther!")]
        public string Description { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "This field is required!")]
        public int CenturyId { get; set; }

        [ForeignKey("CenturyId")]
        public Century Century { get; set; }
    }
}
