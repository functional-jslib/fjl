## platform/
Platform specific, functional version methods. 

This directory does not get exported in the project however modules from this directory get exported from other modules (in ../function, ../object modules, etc., for example).

### About testing here:
Modules here require minimal tests since the methods actually being 
called are all "native" code.
