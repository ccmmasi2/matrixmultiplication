using Matrix.Multiplication.AccessData.ObjectRepository.Interface;
using Matrix.Multiplication.DTOObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Matrix.Multiplication.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessController : ControllerBase
    {
        private readonly IProcessRepository _repo;
        private readonly ILogger<ProcessController> _logger;

        public ProcessController(IProcessRepository repo, ILogger<ProcessController> logger)
        {
            _repo = repo;
            _logger = logger;
        }

        [HttpGet("GetInputList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<object>>> GetProcessAndMatrixInfo()
        {
            _logger.LogInformation("Get list");
            var LItems = await _repo.GetProcessAndMatrixInfo()
                .ToListAsync();
            return Ok(LItems);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public object GetById(int id)
        {
            if (id == 0)
            {
                _logger.LogError("Must send the ID!");
            }

            object Item = _repo.GetProcessById(id);

            return Item;
        }
        [HttpPost]
        public IActionResult AddProcess([FromBody] ProcessPpal process)
        {
            try
            {
                // Realiza las operaciones necesarias para guardar el proceso en tu base de datos.
                // Puedes utilizar una capa de servicios o un repositorio para realizar esta operación.
                // Ejemplo:
                // _processService.AddProcess(process);
                return Ok("Proceso agregado exitosamente.");
            }
            catch (Exception ex)
            {
                // Manejo de errores
                return BadRequest("Error al agregar el proceso: " + ex.Message);
            }
        }
    }
}
