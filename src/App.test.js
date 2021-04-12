// External depedencies
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

// Our depedencies
import App from './App.jsx';

configure({adapter: new Adapter()});

describe('View: <App />', () => {

    it('renders without crashing', () => {
        expect(shallow(<App />))
    });

    it('mounts without crashing', () => {
        expect(mount(<MemoryRouter><App /></MemoryRouter>))
    });    
})