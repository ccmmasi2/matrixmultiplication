using Matrix.Multiplication.AccessData.ObjectRepository.Interface;
using Matrix.Multiplication.Api.models;
using Matrix.Multiplication.DTOObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Matrix.Multiplication.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessController : ControllerBase
    {
        private readonly IProcessRepository _processService;
        private readonly IProcessMatrixRepository _processMatrixRepositor;
        private readonly IProcessMatrixDetailRepository _processMatrixDetailRepository;
        private readonly ILogger<ProcessController> _logger;

        public ProcessController(IProcessRepository processService, IProcessMatrixRepository processMatrixRepositor, IProcessMatrixDetailRepository processMatrixDetailRepository, ILogger<ProcessController> logger)
        {
            _processService = processService;
            _processMatrixRepositor = processMatrixRepositor;
            _processMatrixDetailRepository = processMatrixDetailRepository;
            _logger = logger;
        }

        [HttpGet("GetInputList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<object>>> GetProcessAndMatrixInfo()
        {
            _logger.LogInformation("Get list");
            var LItems = await _processService.GetProcessAndMatrixInfo()
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

            object Item = _processService.GetProcessById(id);

            return Item;
        }
        [HttpPost]
        public IActionResult AddProcess([FromBody] ProcessPpalModel process)
        {
            try
            {
                ProcessPpal objectProcessIn = new ProcessPpal();
                objectProcessIn.Status = process.ProcessStatus;
                objectProcessIn.Date = process.ProcessDate;
                int processId = _processService.InsertSink(objectProcessIn, entity => entity.ID);

                ProcessMatrix objectMatrixIn = null;
                ProcessMatrixDetail objectMatrixDetailIn = null;

                foreach(var matrix in process.Matrix)
                {
                    objectMatrixIn = new ProcessMatrix();
                    objectMatrixIn.IDProcess = processId;
                    objectMatrixIn.MatrixName = matrix.MatrixName;
                    objectMatrixIn.Rows = matrix.Rows;
                    objectMatrixIn.Columns = matrix.Columns;
                    int processMatrixId = _processMatrixRepositor.InsertSink(objectMatrixIn, entity => entity.ID);

                    foreach (var matrixDetail in matrix.Detail)
                    {
                        objectMatrixDetailIn = new ProcessMatrixDetail();
                        objectMatrixDetailIn.IDProcessMatrix = processMatrixId;
                        objectMatrixDetailIn.Row = matrixDetail.Row;
                        objectMatrixDetailIn.Column = matrixDetail.Column;
                        objectMatrixDetailIn.Value = matrixDetail.Value;
                        _processMatrixDetailRepository.InsertSink(objectMatrixDetailIn, entity => entity.ID);
                    }
                }

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
