/*************************************************************************
 * @file Header.tsx
 * @author End Quote
 * @desc Provides layout and navigation for the application.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Avatar from 'react-avatar';

/* LOCAL IMPORTS */
import UserSettingsModal from 'components/modals/user-settings';
import ContactModal from 'components/modals/contact-us';
import { useHeaderHooks } from './Header.hooks';
import { classNames, HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = () => {
  /* States and Hooks */
  const {
    state,
    contact_us,
    setContactUs,
    user_settings,
    setUserSettings,
    onboardGuide,
    LogOut
  } = useHeaderHooks();

  const navigate = useNavigate();

  return (
    <React.Fragment>

      <div className="flex flex-col justify-center items-start self-stretch p-5 text-sm leading-none whitespace-nowrap bg-zinc-950 text-neutral-700">
        <div className="flex gap-1 items-center">
          <div className="gap-2.5 self-stretch my-auto">Home</div>
          <div className="self-stretch my-auto">\</div>
          <div className="gap-2.5 self-stretch my-auto">Browse</div>
          <div className="flex self-stretch my-auto min-h-[17px]" />
          <div className="flex gap-2.5 self-stretch my-auto min-h-[17px]" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
