// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import validWords from '../../../../../../common/valid-words.en';
import VerificationDialog from '../../../../components/wallet/paper-wallet-certificate/VerificationDialog';
import type { InjectedDialogContainerProps } from '../../../../types/injectedPropsType';

type Props = InjectedDialogContainerProps;

@inject('stores', 'actions') @observer
export default class VerificationDialogContainer extends Component<Props> {
  static defaultProps = { actions: null, stores: null, children: null, onClose: () => {} };

  onContinue = (values: { recoveryPhrase: Array<string> }) => {
    this.props.actions.ada.wallets.verifyCertificate.trigger(values);
  };

  render() {
    const { wallets } = this.props.stores.ada;
    const {
      walletCertificateRecoveryPhrase,
      walletCertificateHasError,
      additionalMnemonicWords,
    } = wallets;

    return (
      <VerificationDialog
        suggestedMnemonics={validWords}
        additionalMnemonicWords={additionalMnemonicWords}
        walletCertificateRecoveryPhrase={walletCertificateRecoveryPhrase}
        onContinue={this.onContinue}
        onClose={this.props.onClose}
        error={walletCertificateHasError}
      />
    );
  }
}
