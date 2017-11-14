export interface VertragBezeichnung {
  title: string;
  subtitle: string;
}

export interface Person {
  name: string;
  gebdatum: string
}

export enum VertragStatus {
  gueltig,
  gekuendet
}

export interface Vertrag {
  id: string;
  bezeichnung: VertragBezeichnung;
  vertragsp: Person;
  reisender: Person;
  gueltigab: string,
  status: VertragStatus,
  gekuendet: string
}

export interface ColumnModel {
  field: string;
  header: string;
  singleRow?: boolean
}