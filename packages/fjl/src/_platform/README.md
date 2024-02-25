## _platform/

Platform specific, "functional version" methods. 

*Note:* This directory doesn't get exported "directly" in the project, instead it is exported as the `platform` module.  Additionally, some of its members get individually exported by other modules (for instance `instanceOf` gets exported by '../object' module as well).
