using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectsServices _projectsService;

        public ProjectsController(ProjectsServices projectsService)
        {
            _projectsService = projectsService;
        }

        [HttpGet]
        public IActionResult GetAllProjects()
        {
            try
            {
                var projects = _projectsService.GetAllProjects();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AddProject([FromForm] ProjectViewModel project)
        {
            try
            {
                _projectsService.AddProject(project);
                return Ok(project);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateProject([FromForm] ProjectViewModel project)
        {
            try
            {
                _projectsService.UpdateProject(project);
                return Ok(project);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteProject(int id)
        {
            try
            {
                _projectsService.DeleteProject(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
