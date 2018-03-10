const initialState = {
    email: "rdabler@gmail.com",
    gardens: [
        {
            id: "123",
            status: "viewing",
            crops: [
                {
                    id: "124",
                    name: "Tomato",
                    plant_date: "3/1/2018",
                    germination_days: "10",
                    harvest_days: "50"
                },
                {
                    id: "128",
                    name: "Cucumber",
                    plant_date: "5/1/2018",
                    germination_days: "20",
                    harvest_days: "30"
                }
            ],
            journal: [
                {
                    id: "125",
                    date: "2/1/2018",
                    scope: "123",
                    text: "Tilled garden"
                },
                {
                    id: "126",
                    date: "3/1/2018",
                    scope: "124",
                    text: "Planted tomatoes"
                },
                {
                    id: "127",
                    date: "3/11/2018",
                    scope: "124",
                    text: "Tomatoes germinated"
                }
            ]
        }
    ]
}

export const gardenReducer = (state=initialState, action) => {
    return state;
}