import React from 'react';
import { shallow } from 'enzyme';

import { Garden } from './garden';
import { makeISODate, makeDateFromISOString } from "../utilities";

describe("<Garden />", () => {
    let crop;
    let match;

    beforeEach(() => {
        crop = {
            id: "Abc",
            name: "Tomato",
            variety: "Heirloom",
            plant_date: makeISODate(makeDateFromISOString((new Date("03/14/2018")).toISOString())),
            germination_days: "10",
            harvest_days: "20",
            planting_depth: "1.2",
            row_spacing: "1.3",
            seed_spacing: "1.4",
            status: "viewing"
        };
        
        match = { path: "/garden"};
    });

    it("Renders without crashing", () => {
        const getUser = jest.fn();
        const wrapper = shallow(<Garden crops={[crop]} getUser={getUser} match={match} />);

        expect(wrapper.find("div.garden")).toHaveLength(1);
    });

    it("Should dispatch action on logoff", () => {
        const logoff = jest.fn();
        const getUser = jest.fn();

        const wrapper = shallow(<Garden crops={[crop]} getUser={getUser} logoff={logoff} match={match} />);
        wrapper.find("button.logout").simulate("click");
        
        expect(logoff).toHaveBeenCalled();
    });

    it("Should request user from server", () => {
        const getUser = jest.fn();

        shallow(<Garden crops={[crop]} getUser={getUser} requestedUserFromServer={false} match={match} />);
        
        expect(getUser).toHaveBeenCalled();
    });
});