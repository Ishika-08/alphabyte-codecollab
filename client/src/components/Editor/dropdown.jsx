import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoIosArrowDropdownCircle } from "react-icons/io";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({ onLanguageChange }) {
  const [language, setLanguage] = useState('C++'); 

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage); 
  };

  const LanguageArray = ['C++', 'Java', 'Python'];

  return (
    <Menu as="div" className="relative inline-block text-left mx-2 mt-[-12px]">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-l font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:shadow-lg">
          {language || 'Choose Language'} 
          <IoIosArrowDropdownCircle className="m-1 h-5 w-5 text-black" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          {LanguageArray.map((lang) => (
            <Menu.Item key={lang}>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => handleLanguageChange(lang)} 
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {lang}
                </a>
              )}
            </Menu.Item>))
            }
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

