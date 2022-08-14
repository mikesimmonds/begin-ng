# Table base

## What is it?

Its a generic implementation of the [Angular table CDK](material.angular.io/table).

## How to use.

The component accepts a data set and a list of column definitions (DisplayColumn[]). The table dynamically displays the dataset in the requested columns - if the dataset is updated, or if the column definitions change, the table is automaticaly updated in the view.

Custom columns can be created by adding a DisplayColumn with the relevant columnTitle and a propName. An ng-template is then created with a name property matching the propName from the DisplayColumn definition.

## Todo / Improvements
 - Use [templateName], not [name] for directive property naming.
 - Add explicit templateName in the DisplayColumn object
 - Create a partner pagination component to handle our standard pagination
 - Create a partner search & filter component for server-side searching and filtering
 - Improve the logic on the current text-filter
