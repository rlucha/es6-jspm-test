'use strict'

import angular from 'angular/angular.min'
import hellomsg from 'lib/hello'

var msg = hellomsg

function sayHello() {

    console.log(`${msg} and bye bye nether`)

}

export default sayHello()