using System.ComponentModel.DataAnnotations;

namespace InfinitySales.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}