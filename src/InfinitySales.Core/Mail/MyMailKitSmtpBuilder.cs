using Abp.MailKit;
using Abp.Net.Mail.Smtp;
using MailKit.Net.Smtp;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfinitySales
{
    public class MyMailKitSmtpBuilder : DefaultMailKitSmtpBuilder
    {
        public MyMailKitSmtpBuilder(ISmtpEmailSenderConfiguration smtpEmailSenderConfiguration, IAbpMailKitConfiguration abpMailKitConfiguration)
            : base(smtpEmailSenderConfiguration, abpMailKitConfiguration)
        {
        }

        protected override void ConfigureClient(SmtpClient client)
        {
            
            client.ServerCertificateValidationCallback = (sender, certificate, chain, errors) => true;

            base.ConfigureClient(client);
        }
    }
}
