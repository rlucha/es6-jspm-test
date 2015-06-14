'use strict'

import angular from 'angular'
import hellomsg from 'lib/hello'

var msg = hellomsg

function sayHello() {

    console.log(`${msg} and bye bye obviously 22`)

}

export default sayHello() 