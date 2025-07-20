using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("projects")]
    public class Project
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        [Required]
        public string Name { get; set; } = String.Empty;

        [Column("description")]
        [Required]
        public string Description { get; set; } = String.Empty;

        [Column("status")]
        [Required]
        public string Status { get; set; } = String.Empty;

        [Column("used_techs")]
        [Required]
        public string UsedTechnologies { get; set; } = String.Empty;

        [Column("github_url")]
        [Required]
        public string GitHubUrl { get; set; } = String.Empty;

        [Column("download_url")]
        public string DownloadUrl { get; set; } = String.Empty;

        [Column("image_url")]
        public string ImageUrl { get; set; } = String.Empty;

        public Project() { }

        public Project(
            string name,
            string description,
            string usedTechnologies,
            string status,
            string githubUrl,
            string downloadUrl,
            string imageUrl
        )
        {
            Name = name;
            Description = description;
            UsedTechnologies = usedTechnologies;
            Status = status;
            GitHubUrl = githubUrl;
            DownloadUrl = downloadUrl;
            ImageUrl = imageUrl;
        }
    }
}
