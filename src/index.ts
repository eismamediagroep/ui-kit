import { EismaModal } from './components/modal';
import { EismaButton } from './components/button';
import { EismaInput } from './components/input';
import { EismaSelect } from './components/select';
import { EismaTextarea } from './components/textarea';
import { EismaBadge } from './components/badge';
import { EismaCallout } from './components/callout';
import { EismaCheckbox } from './components/checkbox';
import { EismaRadio } from './components/radio';
import {
  EismaDropdown,
  EismaDropdownItem,
  EismaDropdownSeparator,
  EismaDropdownLabel,
} from './components/dropdown';
import { EismaIcon } from './components/icon';
import { EismaThemeToggle } from './components/theme-toggle';
import { EismaTooltip } from './components/tooltip';
import { EismaSwitch } from './components/switch';
import {
  EismaTabs,
  EismaTabList,
  EismaTab,
  EismaTabPanel,
} from './components/tabs';
import {
  EismaAccordion,
  EismaAccordionItem,
  EismaAccordionTrigger,
  EismaAccordionContent,
} from './components/accordion';
import { EismaCode } from './components/code';
import { EismaCard } from './components/card';

const define = (name: string, ctor: CustomElementConstructor): void => {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get(name)) customElements.define(name, ctor);
};

// Definition order matters: containers that inject attributes onto their
// trigger child (dropdown, tooltip) MUST be defined before the leaf
// components those triggers usually are (eisma-button). Otherwise the leaf's
// mount runs first and passThroughAttributes won't see the aria attrs the
// container is about to set.
define('eisma-modal', EismaModal);
define('eisma-dropdown', EismaDropdown);
define('eisma-tooltip', EismaTooltip);
define('eisma-callout', EismaCallout);
define('eisma-tabs', EismaTabs);
define('eisma-tab-list', EismaTabList);
define('eisma-tab-panel', EismaTabPanel);
define('eisma-accordion', EismaAccordion);
define('eisma-accordion-item', EismaAccordionItem);

define('eisma-button', EismaButton);
define('eisma-dropdown-item', EismaDropdownItem);
define('eisma-dropdown-separator', EismaDropdownSeparator);
define('eisma-dropdown-label', EismaDropdownLabel);
define('eisma-tab', EismaTab);
define('eisma-accordion-trigger', EismaAccordionTrigger);
define('eisma-accordion-content', EismaAccordionContent);

define('eisma-input', EismaInput);
define('eisma-select', EismaSelect);
define('eisma-textarea', EismaTextarea);
define('eisma-checkbox', EismaCheckbox);
define('eisma-radio', EismaRadio);
define('eisma-switch', EismaSwitch);

define('eisma-badge', EismaBadge);
define('eisma-card', EismaCard);
define('eisma-icon', EismaIcon);
define('eisma-theme-toggle', EismaThemeToggle);
define('eisma-code', EismaCode);

export {
  EismaModal,
  EismaButton,
  EismaInput,
  EismaSelect,
  EismaTextarea,
  EismaBadge,
  EismaCallout,
  EismaCheckbox,
  EismaRadio,
  EismaDropdown,
  EismaDropdownItem,
  EismaDropdownSeparator,
  EismaDropdownLabel,
  EismaIcon,
  EismaThemeToggle,
  EismaTooltip,
  EismaSwitch,
  EismaTabs,
  EismaTabList,
  EismaTab,
  EismaTabPanel,
  EismaAccordion,
  EismaAccordionItem,
  EismaAccordionTrigger,
  EismaAccordionContent,
  EismaCode,
  EismaCard,
};
