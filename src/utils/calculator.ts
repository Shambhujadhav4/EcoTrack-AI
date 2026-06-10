/**
 * Input parameters for carbon footprint calculations
 */
export interface EmissionInputs {
  electricity: number;      // Monthly electricity usage in kWh
  naturalGas: number;       // Monthly natural gas usage in Therms
  milesDriven: number;      // Monthly miles driven
  vehicleMpg: number;       // Average vehicle MPG (miles per gallon)
  isEv: boolean;            // Whether the vehicle is electric
  dietType: 'meat-heavy' | 'balanced' | 'vegetarian' | 'vegan'; // User diet type
  weeklyFlights: number;    // Average number of flights per week
}

/**
 * Breakdown of monthly emissions in kg CO2
 */
export interface EmissionResult {
  energy: number;           // Electricity + Natural Gas
  transportation: number;   // Miles driven/charged
  lifestyle: number;        // Diet + Flights
  total: number;            // Total monthly emissions
  highestCategory: 'energy' | 'transportation' | 'lifestyle';
}

/**
 * EPA & standard climate conversion factors (kg of CO2 emissions)
 */
export const CONVERSION_FACTORS = {
  // Electricity emission coefficient: EPA national average is approx 0.855 lbs/kWh, or 0.385 kg/kWh
  ELECTRICITY_KG_PER_KWH: 0.385,
  
  // Natural Gas emission coefficient: EPA standard is 5.3 kg CO2 per Therm
  NATURAL_GAS_KG_PER_THERM: 5.3,
  
  // Gasoline emission coefficient: EPA standard is 8.887 kg CO2 per Gallon of gasoline burned
  GASOLINE_KG_PER_GALLON: 8.887,
  
  // EV emission factor: Average EV uses ~0.3 kWh of grid electricity per mile.
  // 0.3 kWh * 0.385 kg/kWh = 0.115 kg CO2 per mile (national grid average mix)
  EV_KG_PER_MILE: 0.115,
  
  // Diet emissions (kg CO2 per month based on diet studies)
  DIET_MONTHLY: {
    'meat-heavy': 250,  // Approx 3.0 metric tons/year
    'balanced': 180,    // Approx 2.16 metric tons/year
    'vegetarian': 120,  // Approx 1.44 metric tons/year
    'vegan': 70,        // Approx 0.84 metric tons/year
  },
  
  // Flight emission coefficient: Standard passenger emission factor for a medium-haul round-trip segment 
  // is approx 220 kg CO2. We convert weekly flights to monthly flights (x 4.333 weeks/month).
  FLIGHT_KG_PER_TRIP: 220,
  WEEKS_PER_MONTH: 4.333,
};

/**
 * Calculates emissions breakdown in kg CO2 per month based on inputs.
 */
export function calculateEmissions(inputs: EmissionInputs): EmissionResult {
  // 1. Energy emissions: Electricity + Natural Gas
  const electricityEmissions = inputs.electricity * CONVERSION_FACTORS.ELECTRICITY_KG_PER_KWH;
  const naturalGasEmissions = inputs.naturalGas * CONVERSION_FACTORS.NATURAL_GAS_KG_PER_THERM;
  const energy = Math.round((electricityEmissions + naturalGasEmissions) * 100) / 100;

  // 2. Transportation emissions: EV vs Gas Vehicle
  let transportation = 0;
  if (inputs.isEv) {
    // If electric vehicle, calculate using average charging grid mix
    transportation = inputs.milesDriven * CONVERSION_FACTORS.EV_KG_PER_MILE;
  } else {
    // If gasoline vehicle, calculate based on fuel efficiency (MPG)
    const gallonsUsed = inputs.vehicleMpg > 0 ? inputs.milesDriven / inputs.vehicleMpg : 0;
    transportation = gallonsUsed * CONVERSION_FACTORS.GASOLINE_KG_PER_GALLON;
  }
  transportation = Math.round(transportation * 100) / 100;

  // 3. Lifestyle emissions: Diet + Flights
  const dietEmissions = CONVERSION_FACTORS.DIET_MONTHLY[inputs.dietType];
  const flightEmissions = inputs.weeklyFlights * CONVERSION_FACTORS.WEEKS_PER_MONTH * CONVERSION_FACTORS.FLIGHT_KG_PER_TRIP;
  const lifestyle = Math.round((dietEmissions + flightEmissions) * 100) / 100;

  // 4. Totals and metadata
  const total = Math.round((energy + transportation + lifestyle) * 100) / 100;

  // Determine highest emission category
  let highestCategory: 'energy' | 'transportation' | 'lifestyle' = 'energy';
  let maxVal = energy;

  if (transportation > maxVal) {
    highestCategory = 'transportation';
    maxVal = transportation;
  }
  if (lifestyle > maxVal) {
    highestCategory = 'lifestyle';
  }

  return {
    energy,
    transportation,
    lifestyle,
    total,
    highestCategory,
  };
}
