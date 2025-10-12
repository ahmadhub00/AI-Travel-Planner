export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in expoloration',
        icon:'🧍🏻',
        people:'1 People'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 People'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Economy',
        desc:'Stay concious of costs',
        icon:' 💵',
        
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
       
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:' 💸',
        
    }
]

export const AI_PROMPT='Generate Travel Plan for location :{location},for {totalDays} Days and {totalNights} Night for {traveler} with a {budget} budget with hotels options list with rating, prices, Booking url seperately and descriptions and restaurants options list near the location with rating, average price permeal perperson, Booking url and descriptions with  Flights options list similar to hotels list, Flight Price with Booking url seperately and places to visit nearby our location with placeName, Place Details, Place Image url, ticket Pricing, Time required for each of the place from for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format.'