## platform/
Platform specific, "functional version" methods. 

*Note:* This directory doesn't get exported in the project, directly, however modules from this directory get exported via other exports (in '../function', '../object' modules, etc., for example).

### About testing:
Modules here require minimal tests since the methods here are actually "native" code.
