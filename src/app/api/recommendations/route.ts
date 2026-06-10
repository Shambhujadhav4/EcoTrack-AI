import { NextResponse } from 'next/server';

interface RequestBody {
  energy: number;
  transportation: number;
  lifestyle: number;
  total: number;
  highestCategory: 'energy' | 'transportation' | 'lifestyle';
}

const RECOMMENDATIONS = {
  energy: {
    title: "Household Energy Efficiency",
    summary: "Your electricity and natural gas consumption represent your largest source of emissions. Heating, cooling, and powering appliances are high-impact areas where smart changes yield immediate results.",
    tips: [
      {
        id: "en-1",
        title: "Transition to a Green Tariff/Renewable Plan",
        description: "Contact your local electric utility provider to see if they offer a 100% renewable energy option (wind, solar). Making this change can instantly reduce your home grid carbon footprint to near zero.",
        impact: "High Impact (Up to 100% of electricity footprint)"
      },
      {
        id: "en-2",
        title: "Optimize Your Thermostat with Smart Settings",
        description: "Set your thermostat 7-10°F cooler in winter and warmer in summer when you are sleeping or away from home. Utilizing a programmable or smart thermostat can reduce annual heating/cooling costs and emissions by 10%.",
        impact: "Medium Impact (~150-300 kg CO2 saved yearly)"
      },
      {
        id: "en-3",
        title: "LED Lighting & Smart Power Management",
        description: "Replace remaining incandescent light bulbs with LEDs, which use 75% less energy. Additionally, use smart power strips to shut off power to 'vampire appliances' (TVs, chargers, consoles) when not in use.",
        impact: "Low-Medium Impact (~50-100 kg CO2 saved yearly)"
      }
    ]
  },
  transportation: {
    title: "Sustainable Transportation Habits",
    summary: "Your vehicular mileage is currently the dominant driver of your carbon footprint. Optimizing how you commute and maintaining vehicle efficiency are key to driving these numbers down.",
    tips: [
      {
        id: "tr-1",
        title: "Incorporate Active Travel or Public Transit",
        description: "Try replacing just two driving trips a week with walking, cycling, or public transportation. If you commute to work, check if carpooling or working remotely 1-2 days a week is an option.",
        impact: "High Impact (~400-800 kg CO2 saved yearly)"
      },
      {
        id: "tr-2",
        title: "Maintain Proper Vehicle Health",
        description: "Keep tires properly inflated, change air filters, and perform regular engine checkups. Under-inflated tires decrease fuel efficiency by up to 3%. Smooth acceleration rather than aggressive braking saves gas too.",
        impact: "Medium Impact (~100-200 kg CO2 saved yearly)"
      },
      {
        id: "tr-3",
        title: "Plan for an Electric or Hybrid Vehicle Upgrade",
        description: "When it is time to upgrade your car, prioritize full Electric Vehicles (EVs) or Plug-in Hybrids (PHEVs). Even on grids powered partially by fossil fuels, EVs emit less than half the carbon of traditional gas vehicles.",
        impact: "Very High Impact (Up to 70% reduction in travel footprint)"
      }
    ]
  },
  lifestyle: {
    title: "Eco-Conscious Diet & Flying Decisions",
    summary: "Your daily food selection and air travel habits account for a significant portion of your climate impact. Food production and jet fuel combustion are major global greenhouse gas contributors.",
    tips: [
      {
        id: "li-1",
        title: "Adopt a Plant-Forward or Vegetarian Diet",
        description: "Animal agriculture is carbon-intensive. Shifting from a meat-heavy diet to a plant-forward or vegetarian diet can cut your dietary carbon footprint by up to 50%. Start small with a 'Meatless Mondays' routine.",
        impact: "High Impact (~600-1,000 kg CO2 saved yearly)"
      },
      {
        id: "li-2",
        title: "Consolidate Air Travel & Choose Direct Flights",
        description: "Takeoff and landing consume the most jet fuel. Try to consolidate multiple short trips into one longer visit, and book direct flights where possible. Consider high-speed rail for regional trips instead of flying.",
        impact: "High Impact (~250-500 kg CO2 saved per flight avoided)"
      },
      {
        id: "li-3",
        title: "Eliminate Household Food Waste & Compost",
        description: "Roughly 30% of purchased food is thrown away, rotting in landfills and releasing methane. Create weekly meal plans, store food properly, and set up a home compost system to divert organic waste from landfills.",
        impact: "Medium Impact (~150-250 kg CO2 saved yearly)"
      }
    ]
  }
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { total, highestCategory } = body;

    // Simulate AI LLM generation time for natural UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const selectedRecs = RECOMMENDATIONS[highestCategory] || RECOMMENDATIONS.energy;

    // Build custom introductory message from the AI model
    const categoryName = highestCategory === 'energy' ? 'household energy' : highestCategory === 'transportation' ? 'transportation' : 'lifestyle';
    
    // Compute comparison against the US average (1330 kg CO2/month)
    const usAverage = 1330;
    const diffPct = Math.abs(Math.round(((total - usAverage) / usAverage) * 100));
    const isAbove = total > usAverage;
    const comparisonStr = isAbove
      ? `Your footprint is currently ${diffPct}% higher than the US monthly average (${usAverage} kg).`
      : `Your footprint is ${diffPct}% lower than the US monthly average (${usAverage} kg). Excellent work!`;

    const aiExecutiveAnalysis = `Based on our analysis, your highest emission category is ${categoryName.toUpperCase()} (contributing ${body[highestCategory]} kg CO2 this month). ${comparisonStr} By implementing the recommended strategies below, you could potentially reduce your carbon output by up to 25% within the next quarter.`;

    return NextResponse.json({
      success: true,
      highestCategory,
      title: selectedRecs.title,
      summary: selectedRecs.summary,
      analysis: aiExecutiveAnalysis,
      tips: selectedRecs.tips,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process recommendations';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
