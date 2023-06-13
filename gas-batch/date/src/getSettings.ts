type Row = [number | "", Unit | "", number | "", Unit | "", Direction | ""];

const SETTINGS = "__SETTINGS__";
const cellIndexes = {
  startingRow: 3,
  startingColumn: 1,
};

function calculateCellsLength(
  startingIndex: number,
  lastIndex: number
): number {
  return lastIndex - startingIndex + 1;
}

function parseOffset(
  value: number | "",
  unit: Unit | "",
  direction: Direction | ""
): Offset | undefined {
  if (value === "" || !unit || !direction) return undefined;

  return {
    value,
    unit,
    direction,
  };
}

function parseRow(row: Row): Setting | undefined {
  const duration = {
    value: row[0],
    unit: row[1],
  };
  if (duration.value === "" || !duration.unit) return undefined;

  const offset = parseOffset(row[2], row[3], row[4]);

  return {
    duration: duration as Duration,
    offset,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSettings(): Setting[] {
  const settingsSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETTINGS);

  if (!settingsSheet) {
    throw new Error(`sheet ${SETTINGS} not found! ending process...`);
  }

  const lastRowIndex = settingsSheet.getLastRow();
  const lastColumnIndex = settingsSheet.getLastColumn();

  const rowLength = calculateCellsLength(cellIndexes.startingRow, lastRowIndex);
  const columnLength = calculateCellsLength(
    cellIndexes.startingColumn,
    lastColumnIndex
  );

  const settingsRange = settingsSheet
    .getRange(
      cellIndexes.startingRow,
      cellIndexes.startingColumn,
      rowLength,
      columnLength
    )
    .getValues() as Row[];

  const settings = settingsRange.map(parseRow).filter((e) => e) as Setting[];

  Logger.log(`settings parsed! - ${JSON.stringify(settings)}`);

  return settings;
}
