interface Column {
    name: string;
    title: string;
}

interface ColumnExtensions {
    columnName: string;
    width: number|string;
    wordWrapEnabled?: boolean;
}