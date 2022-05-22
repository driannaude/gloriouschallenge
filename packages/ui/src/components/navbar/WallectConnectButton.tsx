import React, { useMemo } from 'react';
import { useCennzExtension } from '../../hooks/useCennzExtension';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

export const WallectConnectButton = () => {
  // Hooks
  const { extensionInstalled, accounts, error, connectWallet } =
    useCennzExtension();
  // Memoized values
  const buttonText = useMemo(() => {
    if (error) {
      return 'Error connecting to extension';
    }
    if (!accounts || !extensionInstalled) {
      return 'Connect Wallet';
    }
    return accounts[0]?.address ?? 'No account';
  }, [accounts, error, extensionInstalled]);

  const buttonTooltip = useMemo(() => {
    if (error) {
      return 'Error connecting to extension';
    }
    if (!accounts || !extensionInstalled) {
      return 'Connect your CENNZNet Wallet';
    }
    return accounts[0]?.address;
  }, [accounts, error, extensionInstalled]);

  // Render
  return (
    <button
      data-testid="wallet-connect-button"
      className="wallet-connect-btn"
      onClick={connectWallet}
      title={buttonTooltip}
    >
      <FontAwesomeIcon icon={faWallet} />
      <span>{buttonText}</span>
    </button>
  );
};
