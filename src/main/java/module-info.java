module br.com.leonardopn {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.media;
    opens br.com.leonardopn to javafx.fxml;
    exports br.com.leonardopn;
}