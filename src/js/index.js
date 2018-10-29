import Modernizr from './modernizr.mdrnzr';
import '../styles/all.scss';
import $ from "jquery";
import debounce from './debounce';
import popper from "popper.js";
import bootstrap from "bootstrap";
import {initRoutes} from './routes.js';

require('../../node_modules/velocity-animate/velocity.js');
require('../../node_modules/velocity-animate/velocity.ui.js');

require('./contact.js');
initRoutes();
