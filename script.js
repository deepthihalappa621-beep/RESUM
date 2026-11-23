$(document).ready(function () {
    "use strict";

    /* =========================================
       1. Dynamic Copyright Year
       ========================================= */
    $("#currentYear").text(new Date().getFullYear());

    /* =========================================
       2. Mobile Navigation Toggle
       ========================================= */
    $("#navToggle").on("click", function () {
        const $navLinks = $("#navLinks");
        const isExpanded = $(this).attr("aria-expanded") === "true";

        $navLinks.slideToggle(220, function () {
            $navLinks.toggleClass("open");
            // Remove inline display style on desktop resize safety
            if (!$navLinks.hasClass("open")) {
                $navLinks.css("display", "");
            }
        });

        $(this).attr("aria-expanded", !isExpanded);
        $(this).find("i").toggleClass("fa-bars fa-xmark");
    });

    // Close mobile menu when a nav link is clicked
    $(".nav-link").on("click", function () {
        if ($(window).width() <= 768) {
            $("#navLinks").slideUp(200).removeClass("open");
            $("#navToggle").attr("aria-expanded", "false");
            $("#navToggle").find("i").removeClass("fa-xmark").addClass("fa-bars");
        }
    });

    /* =========================================
       3. Active Navigation Highlighting
       ========================================= */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    $(".nav-link").each(function () {
        const linkHref = $(this).attr("href");
        if (linkHref === currentPage) {
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
        }
    });

    /* =========================================
       4. Smooth Scrolling for Same-Page Anchors
       ========================================= */
    $('a[href^="#"]').on("click", function (event) {
        const targetSelector = $(this).attr("href");
        if (targetSelector.length > 1 && $(targetSelector).length) {
            event.preventDefault();
            const headerOffset = 75;
            const targetPosition = $(targetSelector).offset().top - headerOffset;

            $("html, body").animate(
                { scrollTop: targetPosition },
                550
            );
        }
    });

    /* =========================================
       5. Scroll Reveal Animation & Back-to-Top Button
       ========================================= */
    function handleScrollEffects() {
        const scrollTop = $(window).scrollTop();
        const windowBottom = scrollTop + $(window).height();

        // Back-to-top button visibility
        if (scrollTop > 260) {
            $("#backToTop").fadeIn(200).css("display", "flex");
        } else {
            $("#backToTop").fadeOut(200);
        }

        // Reveal sections smoothly on scroll
        $(".reveal").each(function () {
            const elementTop = $(this).offset().top;
            if (elementTop < windowBottom - 60) {
                $(this).addClass("visible");
            }
        });
    }

    handleScrollEffects();
    $(window).on("scroll", handleScrollEffects);

    $("#backToTop").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });

    /* =========================================
       6. Download / Print Resume & Bio-data as PDF
       ========================================= */
    $("#downloadResumeBtn").on("click", function () {
        const originalTitle = document.title;
        document.title = "Resume_Your_Full_Name";
        window.print();
        document.title = originalTitle;
    });

    $("#downloadBiodataBtn").on("click", function () {
        const originalTitle = document.title;
        document.title = "Biodata_Your_Full_Name";
        window.print();
        document.title = originalTitle;
    });

    /* =========================================
       7. Contact Form Validation (jQuery)
       ========================================= */
    $("#contactForm").on("submit", function (event) {
        event.preventDefault();

        let isValid = true;
        const name = $.trim($("#name").val());
        const email = $.trim($("#email").val());
        const subject = $.trim($("#subject").val());
        const message = $.trim($("#message").val());
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reset previous errors
        $(".error-message").text("");
        $("input, textarea").removeClass("input-error");
        $("#formFeedback").removeClass("success error").hide().text("");

        // Validate Name
        if (name.length < 2) {
            $("#nameError").text("Please enter your full name (at least 2 characters).");
            $("#name").addClass("input-error");
            isValid = false;
        }

        // Validate Email
        if (!emailPattern.test(email)) {
            $("#emailError").text("Please enter a valid email address.");
            $("#email").addClass("input-error");
            isValid = false;
        }

        // Validate Subject
        if (subject.length < 3) {
            $("#subjectError").text("Please enter a subject (at least 3 characters).");
            $("#subject").addClass("input-error");
            isValid = false;
        }

        // Validate Message
        if (message.length < 10) {
            $("#messageError").text("Please enter a message of at least 10 characters.");
            $("#message").addClass("input-error");
            isValid = false;
        }

        if (isValid) {
            $("#formFeedback")
                .addClass("success")
                .text("Thank you, " + name + "! Your message has been validated and recorded successfully.")
                .fadeIn(250);

            // Reset form fields after successful validation
            this.reset();
        } else {
            $("#formFeedback")
                .addClass("error")
                .text("Please correct the highlighted fields before submitting.")
                .fadeIn(250);
        }
    });

    // Clear individual field error on input
    $("#contactForm input, #contactForm textarea").on("input", function () {
        $(this).removeClass("input-error");
        $(this).siblings(".error-message").text("");
    });
});