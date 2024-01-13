# Makefile to concatenate JavaScript files and install them

# Source and destination directories
SRC_DIR := src
BUILD_DIR := build

# Final output file
OUTPUT_FILE := $(BUILD_DIR)/munduscraft-scripts.js

# Find all JavaScript files in the src/ directory
JS_FILES := $(shell find $(SRC_DIR) -name '*.js')

# Minecraft scripts directory (can be set as an environment variable)
MC_SCRIPT_DIR ?= $(shell read -p "Enter the Minecraft script directory: " dir; echo $$dir)

.PHONY: all clean install

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

install: $(OUTPUT_FILE)
	@echo "Installing script to Minecraft directory..."
	@cp $(OUTPUT_FILE) $(MC_SCRIPT_DIR)/
	@echo "Installation complete."
