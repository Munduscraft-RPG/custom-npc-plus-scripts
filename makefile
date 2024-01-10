# Makefile to concatenate JavaScript files

# Source and destination directories
SRC_DIR := src
BUILD_DIR := build

# Final output file
OUTPUT_FILE := $(BUILD_DIR)/munduscraft-scripts.js

# Find all JavaScript files in the src/ directory
JS_FILES := $(shell find $(SRC_DIR) -name '*.js')

.PHONY: all clean

all: $(OUTPUT_FILE)

$(OUTPUT_FILE): $(JS_FILES) | $(BUILD_DIR)
	@echo "Concatenating JavaScript files..."
	@cat $^ > $@
	@echo "Build complete: $(OUTPUT_FILE)"

$(BUILD_DIR):
	@echo "Creating build directory..."
	@mkdir -p $@

clean:
	@echo "Cleaning up..."
	@rm -rf $(BUILD_DIR)
	@echo "Clean complete."
