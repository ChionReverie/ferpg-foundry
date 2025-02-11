# Contributing Guidelines

## Stylesheets

### Class Names

When naming a style class for the _Fire Emblem RPG_ project, follow these conventions, which are based on the [Block Element Modifier](https://getbem.com/introduction/) conventions.

Firstly, class names are split into chunks: The namespace, block, and optionally element and/or variant names. Each chunk is written in `lower_snake_case`.

A class introduced in the project should have a name beginning with `feRPG-`. This is the **namespace** for this project. (This exists to prevent name clashes with other modules.)

Immediately following the namespace is the the **block** name. If a block is a reuseable component, the name of the block is the name of that component: `feRPG-my_block`

If the object being described is dependent on a parent block, it is an **element**. An element gets an element name following the block name. Element names are preceded with two underscores, and can be chained for nested elements if necessary: `feRPG-my_block__element1__element2`.

Finally, a variant of a block or element is called a **modifier**. The name of a modifier is preceded by two dashes. The name of the modifier in a class is preceded by two dashes, and appears at the end of the class name: `feRPG-my_block--variant`. It may also appear with an element name: `feRPG-my_block__element--variant`. A modifier will be listed with its parent class in HTML.

### Example

There is a component in the project called a 'meter', which displays a bar which grows in proportion to a 'ratio' statistic. The class for the main block is called `feRPG-meter`. The bar is an element within the meter, so it has the class `feRPG-meter__bar`. Finally, if there was a variant of the meter which is 'uncapped', allowing the bar to grow beyond 100% full, it would be called `feRPG-meter--uncapped`.

Using this component in practice looks like the following:

```html
<div
  class="feRPG-meter feRPG-meter--uncapped"
  style="--feRPG-meter-ratio: 0.75"
>
  <div class="feRPG-meter__bar"></div>
</div>
```

### Custom Properties (Variables)

Variables which are declared globally and which may act on a variety of elements are considered 'globally scoped'. Such properties should be given names beginning with `--feRPG-`. This is to prevent name clashes.

Variabled which are declared under a particular component are considered 'locally-scoped', and may have names beginning with `--_` followed by the name of the component, such as `--_labeled_stat-height`.

### Selector Rules

In order to avoid accidentally breaking basic FoundryVTT behaviors, all stylesheet selectors must rely on an element with `--feRPG` in the name.
