namespace Matrix.Multiplication.Api.models
{ 
    public class ProcessPpalModel
    {
        public int ProcessID { get; set; }
        public DateTime ProcessDate { get; set; }
        public bool ProcessStatus { get; set; }
        public MatrixModel[] Matrix { get; set; }
    }

    public class MatrixModel
    {
        public int Rows { get; set; }
        public int Columns { get; set; }
        public string MatrixName { get; set; }
        public MatrixDetailModel[] Detail { get; set; }
    }

    public class MatrixDetailModel
    {
        public int Row { get; set; }
        public int Column { get; set; }
        public int Value { get; set; }
    }
}
