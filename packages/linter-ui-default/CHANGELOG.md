# Changelog
### 2.4.1
- fix: minor null bug fixes

### 2.4.0
- feat: large/minified file optimizations (#612)

### 2.3.5
- fix: do not move the linter tooltip out of the editor

### 2.3.4
- fix: transform the whole overlay to make underneath of the tooltip clickable

### 2.3.3
- fix: make event listeners passive

### 2.3.2
- fix: linter tooltip messages not being visible in some themes

### 2.3.1
- fix: remove extra space from the tooltip due to arrow pointer
- fix: decrease the time required for showing the linter tooltip (faster response)

### 2.3.0
- Fixes overlaps with datatips (linter messages now are positioned above the point, unless there is not enough space) (#607)
- Changes the style of the tooltips so they match datatips (atom-ide-community style) (#607)

  info messages:

  ![image](https://user-images.githubusercontent.com/16418197/102887312-532a8280-441c-11eb-99ca-3e82306f3dfb.png)

  error messages:

  ![image](https://user-images.githubusercontent.com/16418197/102887315-54f44600-441c-11eb-8b3f-d89a463b5865.png)

  when the message is at the top of the page, it does not translate:

  ![image](https://user-images.githubusercontent.com/16418197/102887388-7bb27c80-441c-11eb-8961-6a13890ba86a.png)

### 2.2.4
- Bump dependencies
- Add benchmarks (#605)

### 2.2.3
- if file path of the editor is undefined save the message in ""

### 2.2.2
- Huge number of bug fixes (#604)
- Maximize TypeScript strictness (#604)

### 2.2.1
- Use parcel to build and optimize linter-ui-default (#603)
-
### 2.2.0
- feat: convert codebase to typescript. [This involved many bug fixes](https://github.com/steelbrain/linter-ui-default/pull/602)

## 2.1.5
- fix: check if `intersectsWith` is a function

## 2.1.4
* Update dependencies
* Re-add package-lock.json

## 2.1.3
* Remove package-lock.json

## 2.1.2
* Add another null check for messages


## 2.1.1
* null check guard for messages to prevent unforeseen errors

### 2.1.0
* Bump deps #589
* Use lodash.debounce instead of the deprecated sb-debounce.debounce

## 2.0.1
* improve performance (#581)
* rewrite rendering algorithm (#581)
* fix memory leaks (#581)


## 1.8.1

* Fix `showPanel` being set to `true` on Editor restart (Thanks @Osmose)

## 1.8.0

* Remove support for Legacy Linter messages
* Fix Panel hide/inactive detection (Thanks @willy2dg)

## 1.7.1

* Restore old hiding behavior

## 1.7.0

* Add a max-width to linter toolip
* Re-add `alwaysTakeMinimumSpace` config which works with Atom Docks!
* Attempt to fix `Cannot decorate a destroyed marker` errors (Fix by @sompylasar)

## 1.6.11

* Upgrade `marked` version
* Add `Fix` button to tooltips

## 1.6.10

* Fix alignment of icons for Atom v1.20.0+

## 1.6.9

* Change inline highlighting style from `highlight` to `text`

## 1.6.7

* Was missing check in another place

## 1.6.6

* Possible fix for steelbrain/linter-ui-default#355

## 1.6.5

* Fix inconsistency between panel height set by resizing and from settings

## 1.6.4

* Fix a style issue on Atom v1.19.0
* Fix incorrect times reported to Busy Signal
* Fix behavior of file scope when Linter Panel is used inside a pane container

## 1.6.3

* Hide tooltip when cursor is changed and `tooltipFollows` is set to `Both`

## 1.6.2

* Flip default `hidePanelWhenEmpty` back to true
* Fix a bug where clicking on other pane items (not even center) would hide status bar and panel

## 1.6.1

* Flip default `hidePanelWhenEmpty` to false
* Allow opening editors from markdown links from Message v2 description

## 1.6.0

* Apply panelHeight changes live
* Fix performance regression of v1.5.x
* Use another color variable tooltip background
* Only hide/show dock when Linter is the active item
* Add `Jump to next issue` to `statusBarClickBehavior` config

## 1.5.4

* Fix the last of known Linter Panel bugs

## 1.5.3

* Hide panel if appropriate after active pane item change

## 1.5.2

* F my life.

## 1.5.1

* Flip a check that was making Panel behave weirdly

## 1.5.0

* Remove `hidePanelUnlessTextEditor` config
* Tweak Tooltip visuals (See #301 for Screenshots)
* Do not focus Linter dock on open (less UI clutter)
* Remove linter tooltip when Text Editor is unfocused
* Readd `panelHeight` config and make it work on Docks
* Replace Linter Status bar with icons instead of boxes
* Change status bar to represent Entire Projecy by default
* Add `Both` support to `tooltipFollows` config and make it default
* Fix unnecessary jump to message when clicking links in description

## 1.4.0

* Fix for Nuclide's file tree
* Add `hidePanelWhenEmpty` config
* Add `hidePanelUnlessTextEditor` config

## 1.3.0 (for Atom Beta)

* Add docks API support
* Remove tooltip if it exists on config change
* Remove tooltip when cursor changes (only when `tooltipFollows` is set to `Mouse`)

## 1.2.4

* Fix for Nuclide's Tree View
* Remove tooltip if it exists on config change
* Remove tooltip when cursor changes (only when `tooltipFollows` is set to `Mouse`)

## 1.2.3

* Improve tooltip hiding logic
* Fix two borders on the Bottom Table
* Make description in Bottom Panel clickable
* Use wavy underlines in tree view and editor
* Use theme variable for Bottom Panel font size
* Fix inconsistent border radius of Linter Status
* Fix current line marker in gutter for soft wraps
* Only show url icon on tooltip if specified by linter provider

## 1.2.2

* Fix mouse tooltips for some users
* Fix a crash in TreeView handling a file outside Project Path
* Make busy signal installation and integration optional with `useBusySignal` config

## 1.2.1

* Fix a deprecation warning caused by out-of-date Atom `TextEditor#markBufferRange.properties`

## 1.2.0

* Add `showStatusBar` config
* Fix a typo in Panel Component
* Show line number styles in gutter container
* Validate ranges for NaN to workaround Atom bug
* Move the stauts bar to the left of line:col view
* Fix a typo that would not let `showProviderName` work
* Bump `sb-react-table` to include fix for [steelbrain/react-table#7](https://github.com/steelbrain/react-table/issues/7)
* Fix `Current Line` selector for Panel to support Array-like objects
* Hide Panel's `File` column when Panel is only representing current file

## 1.1.0

* Add option to configure status bar position
* Add support for `Current Line` in `panelRepresents` config
* Fix the Bottom Panel taking 1px height when hidden ([#177](https://github.com/steelbrain/linter-ui-default/pull/177))

## 1.0.0

* Read the [release post](http://steelbrain.me/2017/03/13/linter-v2-released.html).
