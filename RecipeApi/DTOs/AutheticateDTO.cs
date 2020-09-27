using System.ComponentModel.DataAnnotations;

namespace RecipeApi.DTOs
{
 public class AuthenticateDTO
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}