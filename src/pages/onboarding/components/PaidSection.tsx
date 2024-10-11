/*************************************************************************
 * @file PaidSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for PaidSection of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

type Props = {};

const PaidSection = (props: Props) => {
  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        Connect with Stripe for secure and fast payments. Click below to
        complete the final step!
      </p>
    </div>
  );
};

export default PaidSection;
