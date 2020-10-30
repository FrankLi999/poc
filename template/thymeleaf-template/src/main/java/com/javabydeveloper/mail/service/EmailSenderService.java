package com.javabydeveloper.mail.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.javabydeveloper.model.Mail;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;


    public void sendEmail(Mail mail) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        helper.addAttachment("template-cover.png", new ClassPathResource("javabydeveloper-email.PNG"));

        Context context = new Context();
        context.setVariables(mail.getProps());

        String html = templateEngine.process("newsletter-template-fragment", context);
        System.out.println(">>>>>>>>>>>>>>>>>>> html:");
        System.out.println(html);
        System.out.println(">>>>>>>>>>>>>>>>>>> html");
        helper.setTo(mail.getMailTo());
        helper.setText(html, true);
        helper.setSubject(mail.getSubject());
        helper.setFrom(mail.getFrom());

        emailSender.send(message);
    }

}
