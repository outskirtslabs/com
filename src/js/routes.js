import page from 'page';
import $ from 'jquery';
import { letter_open } from './outskirts';

function scroll_to(id) {
  if (id.id !== undefined) {
    id = id.id;
  }
  document.getElementById(id).scrollIntoView();
  window.scrollBy(0, -90);
}

function nav_index() {
  scroll_to('above_nav');
}

function nav_services() {
  scroll_to('services');
}

function nav_ethics() {
  scroll_to('ethics');
}

function nav_ethics_full() {
  letter_open();
}

function nav_imprint() {
  scroll_to('imprint');
}

function nav_privacy() {
  $(document.body).attr('data-overlay-id', '#privacy-overlay');
  $(document.body).attr('data-overlay-open', 'true');
}

function nav_work(ctx) {
  if (ctx.params.project === undefined || !ctx.params.project) {
    scroll_to('portfolio');
  } else {
    project_show(ctx.params.project);
  }
}

function nav_bio() {
  scroll_to('bio');
}

function nav_contact() {
  scroll_to('contact');
}

function nav_error(ctx) {
}

function initRoutes() {

  $('a.nav-link').map(function() { $(this).attr('href', $(this).attr('href').replace('#', '/'))});

  page.base('/');
  page('/', nav_index);
  page('services', nav_services);
  page('ethics', nav_ethics);
  page('ethics/statement', nav_ethics_full);
  page('work', nav_work);
  page('work/:project', nav_work);
  page('bio', nav_bio);
  page('privacy', nav_privacy);
  page('imprint', nav_imprint);
  page('contact', nav_contact);
  page('*', nav_error);
  page();

}

export { initRoutes };
