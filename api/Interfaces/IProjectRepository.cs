using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IProjectRepository
    {
        void Add(Project project);
        void Update(Project project);
        void Delete(Project project);
        List<Project> GetAll();
        Project GetById(int id);
    }
}
