using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext ctx = new AppDbContext();

        public void Add(Project project)
        {
            ctx.Projects.Add(project);
            ctx.SaveChanges();
        }

        public void Delete(Project project)
        {
            ctx.Projects.Remove(project);
            ctx.SaveChanges();
        }

        public List<Project> GetAll()
        {
            return ctx.Projects.ToList();
        }

        public Project GetById(int id)
        {
            return ctx.Projects.Find(id) ?? throw new ArgumentNullException();
        }

        public void Update(Project project)
        {
            ctx.Projects.Update(project);
            ctx.SaveChanges();
        }
    }
}
