export interface RegisteredUsersReport {
  totalUsers: number;
  evolutionData: EvolutionDataItem[]; // Ahora es un array de objetos
  growth: number; // Porcentaje de crecimiento
}

export interface EvolutionDataItem {
  period: string; // "yyyy-MM-dd", "yyyy-Www", "yyyy-MM"
  count: number;
}