using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Repositories;

namespace api.Services
{
    public class ProjectsServices
    {
        private readonly IConfiguration _configuration;
        private ProjectRepository _projectsRepository = new ProjectRepository();

        public ProjectsServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<Project> GetAllProjects()
        {
            return _projectsRepository.GetAll().OrderBy(p => p.Id).ToList();
        }

        public void AddProject(ProjectViewModel project)
        {
            var imageUrl = string.Empty;

            if (project.Image != null)
            {
                HttpResponseMessage uploadResponse;
                UploadImageIntoImageAPI(project, out uploadResponse);

                var responseString = uploadResponse.Content.ReadAsStringAsync().Result;

                // Parse the JSON and extract the URL
                using var doc = JsonDocument.Parse(responseString);
                imageUrl = doc.RootElement.GetProperty("data").GetProperty("url").GetString();
            }

            var projectToAdd = new Project();
            projectToAdd.Name = project.Name;
            projectToAdd.Description = project.Description;
            projectToAdd.UsedTechnologies = project.UsedTechnologies;
            projectToAdd.GitHubUrl = project.GitHubUrl;
            projectToAdd.DownloadUrl = project.DownloadUrl;
            projectToAdd.Status = project.Status;
            projectToAdd.ImageUrl = imageUrl;
            _projectsRepository.Add(projectToAdd);
        }

        public void UpdateProject(ProjectViewModel project)
        {
            var projectToUpdate = _projectsRepository.GetById(project.Id ?? 0);

            if (projectToUpdate == null)
            {
                throw new Exception("Project not found");
            }

            // Only update fields if the input is not empty and different from the current value

            if (!string.IsNullOrWhiteSpace(project.Name) && project.Name != projectToUpdate.Name)
                projectToUpdate.Name = project.Name;

            if (
                !string.IsNullOrWhiteSpace(project.Description)
                && project.Description != projectToUpdate.Description
            )
                projectToUpdate.Description = project.Description;

            if (
                !string.IsNullOrWhiteSpace(project.UsedTechnologies)
                && project.UsedTechnologies != projectToUpdate.UsedTechnologies
            )
                projectToUpdate.UsedTechnologies = project.UsedTechnologies;

            if (
                !string.IsNullOrWhiteSpace(project.Status)
                && project.Status != projectToUpdate.Status
            )
                projectToUpdate.Status = project.Status;

            if (
                !string.IsNullOrWhiteSpace(project.GitHubUrl)
                && project.GitHubUrl != projectToUpdate.GitHubUrl
            )
                projectToUpdate.GitHubUrl = project.GitHubUrl;

            if (
                !string.IsNullOrWhiteSpace(project.DownloadUrl)
                && project.DownloadUrl != projectToUpdate.DownloadUrl
            )
                projectToUpdate.DownloadUrl = project.DownloadUrl;

            var imageUrl = string.Empty;
            if (project.Image != null)
            {
                HttpResponseMessage uploadResponse;
                UploadImageIntoImageAPI(project, out uploadResponse);

                var responseString = uploadResponse.Content.ReadAsStringAsync().Result;

                // Parse the JSON and extract the URL
                using var doc = JsonDocument.Parse(responseString);
                imageUrl = doc.RootElement.GetProperty("data").GetProperty("url").GetString();
            }
            if (!string.IsNullOrEmpty(imageUrl))
                projectToUpdate.ImageUrl = imageUrl;

            _projectsRepository.Update(projectToUpdate);
        }

        public void DeleteProject(int id)
        {
            var projectToDelete = _projectsRepository.GetById(id);

            if (projectToDelete == null)
            {
                throw new Exception("Project not found");
            }

            _projectsRepository.Delete(projectToDelete);
        }

        private void UploadImageIntoImageAPI(
            ProjectViewModel project,
            out HttpResponseMessage uploadResponse
        )
        {
            HttpClient httpClient = new HttpClient();
            MultipartFormDataContent formData = new MultipartFormDataContent();

            // Add the image file to the form data as "image"
            var fileContent = new StreamContent(project.Image.OpenReadStream());
            formData.Add(fileContent, "image", project.Image.FileName);

            // Build the URL with expiration and API key
            var apiKey = _configuration["ApiKeys:MyService"];
            var uploadUrl = $"https://api.imgbb.com/1/upload?key={apiKey}";

            uploadResponse = httpClient.PostAsync(uploadUrl, formData).Result;
            uploadResponse.EnsureSuccessStatusCode();
        }
    }
}
