using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.DTO
{
    public class ProjectViewModel
    {
        public int? Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? UsedTechnologies { get; set; }

        public string? Status { get; set; }

        public string? GitHubUrl { get; set; }

        public string? DownloadUrl { get; set; }

        public string? ImageUrl { get; set; }

        public IFormFile? Image { get; set; } // For POST/PUT only
    }
}
