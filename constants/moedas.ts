export const MOEDAS = ['USD', 'EUR'] as const

export type Moeda = (typeof MOEDAS)[number]
